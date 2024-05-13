import { useCloseMenu } from './useCloseMenu';
export function useMessageInputExtendActions(props) {
  const {
    convId,
    menuRef,
    onSelectOnePicture,
    onSelectOnePictureResult,
    onSelectOneShortVideo,
    onSelectOneShortVideoResult,
    onSelectOnePictureFromCamera,
    onSelectFile,
    onSelectFileResult,
    onSelectSendCard,
    onInit
  } = props;
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const onShowMenu = () => {
    var _menuRef$current, _menuRef$current$star;
    let items = [{
      name: '_uikit_chat_input_long_press_menu_picture',
      isHigh: false,
      icon: 'img',
      onClicked: () => {
        closeMenu(() => {
          onSelectOnePicture({
            onResult: params => {
              onSelectOnePictureResult(params);
            }
          });
        });
      }
    }, {
      name: '_uikit_chat_input_long_press_menu_video',
      isHigh: false,
      icon: 'triangle_in_rectangle',
      onClicked: () => {
        closeMenu(() => {
          onSelectOneShortVideo({
            convId: convId,
            onResult: params => {
              onSelectOneShortVideoResult(params);
            }
          });
        });
      }
    }, {
      name: '_uikit_chat_input_long_press_menu_camera',
      isHigh: false,
      icon: 'camera_fill',
      onClicked: () => {
        closeMenu(() => {
          onSelectOnePictureFromCamera({
            onResult: params => {
              onSelectOnePictureResult(params);
            }
          });
        });
      }
    }, {
      name: '_uikit_chat_input_long_press_menu_file',
      isHigh: false,
      icon: 'folder',
      onClicked: () => {
        closeMenu(() => {
          onSelectFile({
            onResult: params => {
              onSelectFileResult(params);
            }
          });
        });
      }
    }, {
      name: '_uikit_chat_input_long_press_menu_card',
      isHigh: false,
      icon: 'person_single_fill',
      onClicked: () => {
        closeMenu(() => {
          onSelectSendCard();
        });
      }
    }];
    items = onInit ? onInit(items) : items;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startShowWithProps) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current, {
      initItems: items,
      onRequestModalClose: closeMenu,
      layoutType: 'left',
      hasCancel: true
    });
  };
  return {
    onShowMessageInputExtendActions: onShowMenu
  };
}
//# sourceMappingURL=useMessageInputExtendActions.js.map