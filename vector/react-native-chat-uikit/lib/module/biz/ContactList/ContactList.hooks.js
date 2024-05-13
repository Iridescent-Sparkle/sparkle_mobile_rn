import * as React from 'react';
import { View } from 'react-native';
import { ChatMultiDeviceEvent } from 'react-native-chat-sdk';

// import { DeviceEventEmitter } from 'react-native';
import { UIListenerType, useChatContext, useChatListener } from '../../chat';
import { useI18nContext } from '../../i18n';
import { Text } from '../../ui/Text';
import { containsChinese, getPinyinFirsLetter } from '../../utils';
import { Badges } from '../Badges';
import { useCloseMenu } from '../hooks/useCloseMenu';
import { useContactListMoreActions } from '../hooks/useContactListMoreActions';
import { useSectionList } from '../List';
import { g_index_alphabet_range } from './const';
import { ContactItem, ContactListItemHeaderMemo, ContactListItemMemo } from './ContactList.item';
/**
 * Contact list hook.
 */
export function useContactList(props) {
  const {
    onClickedItem,
    onLongPressedItem,
    testMode,
    // onRequestMultiData,
    onSort: propsOnSort,
    onClickedNewContact: propsOnClickedNewContact,
    onCreateGroupResultValue,
    contactType,
    selectedData,
    groupId,
    onAddGroupParticipantResult,
    ListItemRender: propsListItemRender,
    ListItemHeaderRender: propsListItemHeaderRender,
    propsRef,
    onInitialized,
    sectionListProps: propsSectionListProps,
    onStateChanged,
    onInitListItemActions: propsOnInitListItemActions,
    onClickedNewRequest,
    onClickedGroupList
  } = props;
  const sectionListProps = useSectionList({
    // onInit: () => init({ onFinished: onInitialized }),
  });
  const {
    isSort,
    setIndexTitles,
    setSection,
    sectionsRef,
    ref: sectionListRef,
    isAutoLoad,
    setListState
  } = sectionListProps;
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [selectedMemberCount, setSelectedMemberCount] = React.useState(0);
  const choiceType = React.useRef('multiple').current;
  const [requestCount, setRequestCount] = React.useState(0);
  const [groupCount, setGroupCount] = React.useState(0);
  const [avatarUrl, setAvatarUrl] = React.useState();
  const {
    tr
  } = useI18nContext();
  const im = useChatContext();
  const menuRef = React.useRef(null);
  const alertRef = React.useRef(null);
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const ListItemRenderRef = React.useRef(propsListItemRender ?? ContactListItemMemo);
  const ListItemHeaderRenderRef = React.useRef(propsListItemHeaderRender ?? ContactListItemHeaderMemo);
  const {
    onShowContactListMoreActions
  } = useContactListMoreActions({
    menuRef,
    alertRef
  });
  const updateState = React.useCallback(state => {
    setListState === null || setListState === void 0 ? void 0 : setListState(state);
    onStateChanged === null || onStateChanged === void 0 ? void 0 : onStateChanged(state);
  }, [onStateChanged, setListState]);
  const onSort = React.useCallback((prevProps, nextProps) => {
    if (propsOnSort) {
      return propsOnSort(prevProps, nextProps);
    } else {
      return sortContact(prevProps, nextProps);
    }
  }, [propsOnSort]);
  const onClickedCallback = React.useCallback(data => {
    onClickedItem === null || onClickedItem === void 0 ? void 0 : onClickedItem(data);
  }, [onClickedItem]);
  const onLongPressCallback = React.useCallback(data => {
    onLongPressedItem === null || onLongPressedItem === void 0 ? void 0 : onLongPressedItem(data);
  }, [onLongPressedItem]);
  const getFirst = React.useCallback(str => {
    let ret;
    if (str && str.length > 0) {
      const first = str[0].toLocaleUpperCase();
      ret = first;
      if (containsChinese(first)) {
        var _getPinyinFirsLetter$;
        ret = (_getPinyinFirsLetter$ = getPinyinFirsLetter(first).at(0)) === null || _getPinyinFirsLetter$ === void 0 ? void 0 : _getPinyinFirsLetter$.toLocaleUpperCase();
      }
    }
    return ret;
  }, []);
  const removeDuplicateData = React.useCallback(list => {
    const uniqueList = list.filter((item, index, self) => index === self.findIndex(t => t.section.userId === item.section.userId));
    return uniqueList;
  }, []);
  const calculateGroupCount = React.useCallback(() => {
    if (contactType !== 'create-group') {
      return;
    }
    let count = 0;
    sectionsRef.current.forEach(section => {
      section.data.forEach(item => {
        if (item.section.checked === true) {
          count++;
        }
      });
    });
    setSelectedCount(count);
  }, [contactType, sectionsRef]);
  const calculateAddedGroupMemberCount = React.useCallback(() => {
    if (contactType !== 'add-group-member') {
      return;
    }
    let count = 0;
    sectionsRef.current.forEach(section => {
      section.data.forEach(item => {
        if (item.section.checked === true) {
          if (groupId) {
            const isExisted = im.getGroupMember({
              groupId: groupId,
              userId: item.section.userId
            });
            if (isExisted === undefined) {
              count++;
            }
          }
        }
      });
    });
    setSelectedMemberCount(count);
  }, [contactType, groupId, im, sectionsRef]);
  const onChangeGroupCount = React.useCallback(() => {
    im.fetchJoinedGroupCount({
      onResult: result => {
        if (result.isOk === true && result.value) {
          setGroupCount(result.value);
        }
      }
    });
  }, [im]);
  const refreshToUI = React.useCallback(list => {
    if (isSort === true) {
      list.sort(onSort);
    }
    const uniqueList = removeDuplicateData(list);
    const sortList = [];
    uniqueList.forEach(item => {
      var _item$section$userNam, _item$section$userNam2;
      const first = getFirst((_item$section$userNam = item.section.userName) === null || _item$section$userNam === void 0 ? void 0 : (_item$section$userNam2 = _item$section$userNam[0]) === null || _item$section$userNam2 === void 0 ? void 0 : _item$section$userNam2.toLocaleUpperCase());
      const indexTitle = first ? g_index_alphabet_range.includes(first) ? first : '#' : '#';
      const index = sortList.findIndex(section => {
        return section.indexTitle === indexTitle;
      });
      if (index === -1) {
        sortList.push({
          indexTitle: indexTitle,
          data: [item]
        });
      } else {
        var _sortList$index;
        (_sortList$index = sortList[index]) === null || _sortList$index === void 0 ? void 0 : _sortList$index.data.push(item);
      }
    });
    sectionsRef.current = sortList;
    calculateGroupCount();
    calculateAddedGroupMemberCount();
    setIndexTitles(sectionsRef.current.map(item => item.indexTitle));
    setSection(sectionsRef.current);
  }, [calculateAddedGroupMemberCount, calculateGroupCount, getFirst, isSort, onSort, removeDuplicateData, sectionsRef, setIndexTitles, setSection]);
  const flatList = React.useCallback(sectionList => {
    return sectionList.map(section => {
      return section.data.map(item => {
        return item;
      });
    }).flat();
  }, []);
  const addContactToUI = React.useCallback(data => {
    const list = flatList(sectionsRef.current);
    list.push({
      id: data.userId,
      section: data
    });
    refreshToUI(list);
  }, [flatList, refreshToUI, sectionsRef]);
  const removeContactToUI = React.useCallback(userId => {
    sectionsRef.current = sectionsRef.current.filter(section => {
      section.data = section.data.filter(item => {
        return item.section.userId !== userId;
      });
      return section.data.length > 0;
    });
    refreshToUI(flatList(sectionsRef.current));
  }, [flatList, refreshToUI, sectionsRef]);
  const updateContactToUI = React.useCallback(data => {
    const list = flatList(sectionsRef.current);
    const isExisted = list.find(item => {
      if (item.id === data.userId) {
        item.section = {
          ...item.section,
          ...data
        };
        return true;
      }
      return false;
    });
    if (isExisted !== undefined) {
      if (data.checked !== undefined) {
        if (contactType === 'create-group') {
          im.setModelState({
            tag: contactType,
            id: data.userId,
            state: {
              checked: data.checked
            }
          });
        } else if (contactType === 'add-group-member') {
          if (groupId) {
            im.setModelState({
              tag: groupId,
              id: data.userId,
              state: {
                checked: data.checked
              }
            });
          }
        }
      }
      refreshToUI(list);
    }
  }, [contactType, flatList, groupId, im, refreshToUI, sectionsRef]);
  const onCheckClickedCallback = React.useCallback(data => {
    if (contactType !== 'create-group' && contactType !== 'add-group-member') {
      return;
    }
    if (data && data.checked !== undefined) {
      if (choiceType === 'single') {} else if (choiceType === 'multiple') {
        const tmp = {
          ...data,
          checked: !data.checked
        };
        updateContactToUI(tmp);
      }
    }
  }, [choiceType, contactType, updateContactToUI]);
  const onIndexSelected = React.useCallback(index => {
    var _sectionListRef$curre, _sectionListRef$curre2;
    sectionListRef === null || sectionListRef === void 0 ? void 0 : (_sectionListRef$curre = sectionListRef.current) === null || _sectionListRef$curre === void 0 ? void 0 : (_sectionListRef$curre2 = _sectionListRef$curre.scrollToLocation) === null || _sectionListRef$curre2 === void 0 ? void 0 : _sectionListRef$curre2.call(_sectionListRef$curre, {
      sectionIndex: index,
      itemIndex: 1
    });
  }, [sectionListRef]);
  const init = React.useCallback(async params => {
    var _im$user;
    const {
      isClearState,
      onFinished
    } = params;
    // im.setOnRequestData(onRequestMultiData);
    if (testMode === 'only-ui') {
      const names = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa']; // Add more names as needed

      const generateRandomNames = () => {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
      };
      const array = Array.from({
        length: 10
      }, (_, index) => ({
        id: index.toString()
      }));
      const testList = array.map(item => {
        return {
          id: item.id,
          section: {
            userId: item.id,
            remark: item.id + generateRandomNames(),
            userName: generateRandomNames(),
            userAvatar: 'https://cdn2.iconfinder.com/data/icons/valentines-day-flat-line-1/58/girl-avatar-512.png'
          }
        };
      });
      refreshToUI(testList);
      return;
    }
    const url = (_im$user = im.user(im.userId)) === null || _im$user === void 0 ? void 0 : _im$user.avatarURL;
    if (url) {
      setAvatarUrl(url);
    }
    if (isAutoLoad === true) {
      if (isClearState === undefined || isClearState === true) {
        if (contactType === 'create-group') {
          im.clearModelState({
            tag: contactType
          });
        } else if (contactType === 'add-group-member') {
          if (groupId) {
            im.clearModelState({
              tag: groupId
            });
          }
        }
      }
      const s = await im.loginState();
      if (s === 'logged') {
        updateState('loading');
        if (contactType === 'add-group-member') {
          im.getAllContacts({
            onResult: async result => {
              const {
                isOk,
                value,
                error
              } = result;
              if (isOk === true) {
                if (value && groupId) {
                  im.getGroupAllMembers({
                    groupId,
                    onResult: groupResult => {
                      if (groupResult.isOk === true) {
                        const groupMembers = groupResult.value ?? [];
                        const list = value.map(item => {
                          var _im$getModelState;
                          const isExisted = groupMembers.find(member => {
                            return member.memberId === item.userId;
                          });
                          return {
                            id: item.userId,
                            section: {
                              ...item,
                              checked: isExisted !== undefined ? true : ((_im$getModelState = im.getModelState({
                                tag: groupId,
                                id: item.userId
                              })) === null || _im$getModelState === void 0 ? void 0 : _im$getModelState.checked) ?? false,
                              disable: isExisted !== undefined
                            },
                            contactType: contactType
                          };
                        });
                        refreshToUI(list);
                        updateState('normal');
                      } else {
                        if (groupResult.error) {
                          updateState('error');
                          im.sendError({
                            error: groupResult.error
                          });
                        }
                      }
                    }
                  });
                }
              } else {
                if (error) {
                  updateState('error');
                  im.sendError({
                    error
                  });
                }
              }
              onFinished === null || onFinished === void 0 ? void 0 : onFinished();
            }
          });
        } else {
          im.getAllContacts({
            onResult: result => {
              const {
                isOk,
                value,
                error
              } = result;
              if (isOk === true) {
                if (value) {
                  const list = value.map(item => {
                    var _im$getModelState2;
                    return {
                      id: item.userId,
                      section: contactType === 'create-group' ? {
                        ...item,
                        checked: ((_im$getModelState2 = im.getModelState({
                          tag: contactType,
                          id: item.userId
                        })) === null || _im$getModelState2 === void 0 ? void 0 : _im$getModelState2.checked) ?? false
                      } : item,
                      contactType: contactType
                    };
                  });
                  refreshToUI(list);
                  updateState('normal');
                }
              } else {
                if (error) {
                  updateState('error');
                  im.sendError({
                    error
                  });
                }
              }
              onFinished === null || onFinished === void 0 ? void 0 : onFinished();
            }
          });
        }
        onChangeGroupCount();
      } else {
        updateState('error');
      }
    }
  }, [contactType, groupId, im, isAutoLoad, onChangeGroupCount, refreshToUI, testMode, updateState]);
  const contactItems = React.useCallback(_ref => {
    let {
      requestCount
    } = _ref;
    if (contactType !== 'contact-list') {
      return null;
    }
    const items = [/*#__PURE__*/React.createElement(ContactItem, {
      name: tr('_uikit_contact_new_request'),
      count: /*#__PURE__*/React.createElement(Badges, {
        count: requestCount
      }),
      hasArrow: true,
      onClicked: onClickedNewRequest
    }), /*#__PURE__*/React.createElement(ContactItem, {
      name: tr('_uikit_contact_group_list'),
      count: /*#__PURE__*/React.createElement(Text, {
        paletteType: 'label',
        textType: 'medium'
      }, null),
      hasArrow: true,
      onClicked: onClickedGroupList
    })];
    const newContactItems = propsOnInitListItemActions ? propsOnInitListItemActions(items) : items;
    return newContactItems;
  }, [contactType, onClickedGroupList, onClickedNewRequest, propsOnInitListItemActions, tr]);

  // const onAddedContact = React.useCallback(
  //   (userId: string) => {
  //     if (contactType !== 'contact-list') {
  //       return;
  //     }
  //     im.getContact({
  //       userId,
  //       onResult: (result) => {
  //         if (result.isOk === true && result.value) {
  //           addContactToUI(result.value);
  //         }
  //       },
  //     });
  //   },
  //   [addContactToUI, contactType, im]
  // );

  useChatListener(React.useMemo(() => {
    return {
      onContactAdded: async _userId => {
        // onAddedContact(userId);
        init({});
      },
      onContactDeleted: async userId => {
        removeContactToUI(userId);
      },
      onConversationEvent: (event, convId, _convType) => {
        if (event === ChatMultiDeviceEvent.CONTACT_REMOVE) {
          if (convId) {
            removeContactToUI(convId);
          }
        }
      },
      onContactEvent: event => {
        if (event === ChatMultiDeviceEvent.CONTACT_ACCEPT || event === ChatMultiDeviceEvent.CONTACT_REMOVE) {
          init({});
        }
      }
    };
  }, [init, removeContactToUI]));
  const onCreateGroupCallback = React.useCallback(() => {
    if (contactType !== 'create-group') {
      return;
    }
    const list = flatList(sectionsRef.current).filter(item => {
      return item.section.checked === true;
    }).map(item => {
      return item.section;
    });
    onCreateGroupResultValue === null || onCreateGroupResultValue === void 0 ? void 0 : onCreateGroupResultValue(list);
  }, [contactType, flatList, onCreateGroupResultValue, sectionsRef]);
  const onClickedAddGroupParticipant = React.useCallback(() => {
    if (contactType !== 'add-group-member') {
      return;
    }
    const list = flatList(sectionsRef.current).filter(item => {
      if (item.section.checked === true) {
        if (groupId) {
          const isExisted = im.getGroupMember({
            groupId: groupId,
            userId: item.section.userId
          });
          return isExisted === undefined;
        }
      }
      return false;
    }).map(item => {
      return item.section;
    });
    onAddGroupParticipantResult === null || onAddGroupParticipantResult === void 0 ? void 0 : onAddGroupParticipantResult(list);
  }, [contactType, flatList, groupId, im, onAddGroupParticipantResult, sectionsRef]);
  const addContact = React.useCallback(userId => {
    if (contactType !== 'contact-list') {
      return;
    }
    im.addNewContact({
      userId: userId,
      reason: 'add contact'
    });
  }, [contactType, im]);
  const removeContact = React.useCallback(item => {
    if (contactType !== 'contact-list') {
      return;
    }
    im.removeContact({
      userId: item.userId
    });
  }, [contactType, im]);
  const removeConversation = React.useCallback(userId => {
    im.removeConversation({
      convId: userId
    });
  }, [im]);
  const setContactRemark = React.useCallback(item => {
    if (item.remark) {
      im.setContactRemark({
        userId: item.userId,
        remark: item.remark
      });
    }
  }, [im]);
  const onClickedNewContact = React.useCallback(() => {
    if (propsOnClickedNewContact) {
      propsOnClickedNewContact();
    } else {
      onShowContactListMoreActions(addContact);
    }
  }, [addContact, onShowContactListMoreActions, propsOnClickedNewContact]);
  const ListHeaderComponent = React.useCallback(() => {
    const ret = contactItems({
      groupCount,
      requestCount
    });
    return /*#__PURE__*/React.createElement(View, null, ret);
  }, [contactItems, groupCount, requestCount]);
  if (propsRef !== null && propsRef !== void 0 && propsRef.current) {
    propsRef.current.addItem = item => {
      addContact(item.userId);
    };
    propsRef.current.closeMenu = () => closeMenu();
    propsRef.current.deleteItem = item => {
      removeContact(item);
      removeConversation(item.userId);
    };
    propsRef.current.getAlertRef = () => alertRef;
    propsRef.current.getList = () => {
      return flatList(sectionsRef.current).map(item => item.section);
    };
    propsRef.current.getMenuRef = () => menuRef;
    propsRef.current.getSectionListRef = () => {
      return sectionListRef;
    };
    propsRef.current.refreshList = () => {
      refreshToUI(flatList(sectionsRef.current));
    };
    propsRef.current.reloadList = () => {
      init({
        onFinished: onInitialized
      });
    };
    propsRef.current.showMenu = () => {
      onShowContactListMoreActions(addContact);
    };
    propsRef.current.updateItem = item => {
      setContactRemark(item);
    };
  }
  React.useEffect(() => {
    const listener = {
      onAddedEvent: data => {
        addContactToUI(data);
      },
      onDeletedEvent: data => {
        removeContactToUI(data.userId);
      },
      onUpdatedEvent: data => {
        updateContactToUI(data);
      },
      onRequestRefreshEvent: () => {
        refreshToUI(flatList(sectionsRef.current));
      },
      onRequestReloadEvent: () => {
        init({
          onFinished: onInitialized
        });
      },
      type: UIListenerType.Contact
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [addContactToUI, flatList, im, init, onInitialized, refreshToUI, removeContactToUI, sectionsRef, updateContactToUI]);
  React.useEffect(() => {
    if (selectedData && selectedData.length > 0) {
      setSelectedCount(selectedData.length);
      init({
        isClearState: false
      });
    } else {
      init({});
    }
  }, [init, selectedData]);
  React.useEffect(() => {
    const listener = {
      onNewRequestListChanged: list => {
        setRequestCount(list.length);
      }
    };
    im.requestList.addListener('ContactList', listener);
    return () => {
      im.requestList.removeListener('ContactList');
    };
  }, [im.requestList, onChangeGroupCount]);
  React.useEffect(() => {
    im.requestList.getRequestList({
      onResult: result => {
        var _result$value;
        setRequestCount(((_result$value = result.value) === null || _result$value === void 0 ? void 0 : _result$value.length) ?? 0);
      }
    });
  }, [im.requestList]);
  return {
    ...sectionListProps,
    sectionListProps: propsSectionListProps,
    propsSectionListProps,
    onIndexSelected,
    onRequestCloseMenu: closeMenu,
    onClickedNewContact,
    menuRef,
    alertRef,
    onClicked: onClickedCallback,
    onLongPressed: onLongPressCallback,
    onCheckClicked: onCheckClickedCallback,
    selectedCount,
    onClickedCreateGroup: onCreateGroupCallback,
    selectedMemberCount,
    onClickedAddGroupParticipant,
    requestCount,
    groupCount,
    avatarUrl,
    tr,
    ListItemRender: ListItemRenderRef.current,
    ListItemHeaderRender: ListItemHeaderRenderRef.current,
    contactItems,
    ListHeaderComponent
  };
}
const sortContact = (prevProps, nextProps) => {
  if (prevProps.section.userName && prevProps.section.userName.length > 0 && nextProps.section.userName && nextProps.section.userName.length > 0) {
    const prevFirstLetter = prevProps.section.userName.toLowerCase();
    const nextFirstLetter = nextProps.section.userName.toLowerCase();
    if (prevFirstLetter < nextFirstLetter) {
      return -1;
    } else if (prevFirstLetter > nextFirstLetter) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
//# sourceMappingURL=ContactList.hooks.js.map