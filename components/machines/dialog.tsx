import Icon from "@chakra-ui/icon"
import { Center, HStack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { Portal } from "@reach/portal"
import * as dialog from "@ui-machines/dialog"
import { useMachine, useSetup } from "@ui-machines/react"
import { HiX } from "react-icons/hi"

export function Dialog(props: { controls: any }) {
  const [state, send] = useMachine(dialog.machine, { context: props.controls })
  const ref = useSetup<HTMLButtonElement>({ send, id: "1" })
  const api = dialog.connect(state, send)

  return (
    <>
      <chakra.button
        px="4"
        py="2"
        bg="green.500"
        color="white"
        fontWeight="medium"
        ref={ref}
        {...api.triggerProps}
      >
        Open Dialog
      </chakra.button>
      {api.isOpen && (
        <Portal>
          <chakra.div
            position="fixed"
            inset="0"
            bg="blackAlpha.500"
            zIndex="modal"
          />
          <Center
            height="100vh"
            width="100vw"
            position="fixed"
            zIndex="modal"
            inset="0"
            {...api.underlayProps}
          >
            <chakra.div
              width="full"
              maxW="400px"
              rounded="md"
              bg="white"
              padding="5"
              position="relative"
              pointerEvents="auto"
              {...api.contentProps}
            >
              <chakra.h2
                fontWeight="semibold"
                fontSize="lg"
                mb="2"
                {...api.titleProps}
              >
                Edit profile
              </chakra.h2>
              <chakra.p fontSize="sm" {...api.descriptionProps} mb="3">
                Make changes to your profile here. Click save when you are done.
              </chakra.p>

              <HStack>
                <chakra.input
                  flex="1"
                  fontSize="sm"
                  borderWidth="1px"
                  rounded="base"
                  px="2"
                  py="1"
                  placeholder="Enter name..."
                />
                <chakra.button
                  bg="green.500"
                  color="white"
                  rounded="base"
                  fontWeight="semibold"
                  fontSize="sm"
                  px="4"
                  py="1"
                >
                  Save
                </chakra.button>
              </HStack>
              <chakra.button
                display="flex"
                position="absolute"
                top="3"
                right="3"
                {...api.closeButtonProps}
              >
                <Icon as={HiX} />
              </chakra.button>
            </chakra.div>
          </Center>
        </Portal>
      )}
    </>
  )
}
