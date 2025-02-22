import {
  ModalRoot,
  ModalContent,
  ModalOverlay,
} from '../elements/ModalPrimitives'
import { VStack, HStack } from '../elements/LayoutPrimitives'
import { Button } from '../elements/Button'
import { StyledText } from '../elements/StyledText'
import { useCallback } from 'react'

type ConfirmationModalProps = {
  message?: string
  richMessage?: React.ReactNode
  icon?: React.ReactNode
  acceptButtonLabel?: string
  cancelButtonLabel?: string
  onAccept: () => void
  onOpenChange: (open: boolean) => void
}

export function ConfirmationModal(props: ConfirmationModalProps): JSX.Element {
  const safeOnOpenChange = useCallback(
    (open: boolean) => {
      props.onOpenChange(open)
      setTimeout(() => {
        document.body.style.removeProperty('pointer-events')
      }, 200)
    },
    [props]
  )

  return (
    <ModalRoot defaultOpen onOpenChange={safeOnOpenChange}>
      <ModalOverlay />
      <ModalContent css={{ bg: '$grayBg', maxWidth: '20em', zIndex: '20' }}>
        <VStack alignment="center" distribution="center" css={{ p: '15px' }}>
          {props.icon ? props.icon : null}
          {props.richMessage ? (
            props.richMessage
          ) : (
            <StyledText>{props.message}</StyledText>
          )}
          <HStack distribution="center" css={{ pt: '$2' }}>
            <Button
              style="ctaOutlineYellow"
              css={{ mr: '$2' }}
              onClick={() => props.onOpenChange(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  props.onOpenChange(false)
                }
              }}
            >
              {props.cancelButtonLabel ? props.cancelButtonLabel : 'Cancel'}
            </Button>
            <Button
              style="ctaDarkYellow"
              onClick={() => {
                props.onAccept()
                document.body.style.removeProperty('pointer-events')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  props.onAccept()
                  document.body.style.removeProperty('pointer-events')
                }
              }}
            >
              {props.acceptButtonLabel ?? 'Confirm'}
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </ModalRoot>
  )
}
