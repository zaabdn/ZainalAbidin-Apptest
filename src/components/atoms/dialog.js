import React from "react"
import { Portal, Dialog } from "react-native-paper"
import PropTypes from "prop-types"

const CDialog = ({ content, actions, visible, dismissable, onDismiss }) => (
  <Portal>
    <Dialog visible={visible} dismissable={dismissable} onDismiss={onDismiss}>
      <Dialog.Content>{content}</Dialog.Content>
      {actions && <Dialog.Actions>{actions}</Dialog.Actions>}
    </Dialog>
  </Portal>
)

CDialog.propTypes = {
  content: PropTypes.node.isRequired,
  actions: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  dismissable: PropTypes.bool,
  onDismiss: PropTypes.func,
}

CDialog.defaultProps = {
  visible: false,
  dismissable: false,
}

export default CDialog
