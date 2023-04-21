import { Avatar, List, Input, InputRef, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import { userService } from '@/service';

const { Search } = Input;

export default function ChatPage() {
  const [chatID, setChatID] = useState<string>();
  const [chatList, setChatList] = useState<any[]>([]);
  const [btnText, setBtnText] = useState<string>('SEND');
  const [sending, setSending] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const listContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<InputRef>(null);

  useEffect(() => {
    setChatID(uuidv4());
    console.log('chatID: ', chatID);
    setChatList([
      {
        role: 'gpt',
        name: 'ChatGPT',
        content: 'Hi, what can i help you?',
      },
    ]);
  }, []);

  const onSearch = async (value, evt) => {
    console.log('value:', value);
    console.log('evt', evt);

    if (value.length == 0) {
      message.error('Please input something !');
      return;
    }

    setSending(true);
    setBtnText('WAITING...');

    let messageList = [...chatList];
    messageList.push({
      role: 'user',
      name: 'You',
      content: value,
    });

    console.log('messageList: ', messageList);

    const res = await userService.chat(messageList);
    console.log('res:', res);
    if (res.code != 200) {
      if (res.msg && res.msg.length > 0) {
        message.error(res.msg);
      } else {
        message.error('request failed, try again');
      }
    } else {
      messageList.push({
        role: 'gpt',
        name: 'ChatGPT',
        content: res.content,
      });

      setChatList(messageList);
      setSearchValue('');
    }

    setSending(false);
    setBtnText('SEND');
    searchRef.current?.focus();
  };

  useEffect(() => {
    listContainerRef.current?.scrollTo({
      top: listContainerRef.current.scrollHeight,
    });
  }, [chatList]);

  return (
    <div className="m-chat">
      <div ref={listContainerRef} className="m-chat-list">
        <List
          itemLayout="horizontal"
          dataSource={chatList}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item.role == 'gpt'
                        ? `https://note-1252824460.cos.ap-nanjing.myqcloud.com/chatgpt.png`
                        : `https://note-1252824460.cos.ap-nanjing.myqcloud.com/avatar.jpg`//`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`
                    }
                  />
                }
                title={item.name}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
      <Search
        ref={searchRef}
        placeholder="input anything here to send"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onSearch={onSearch}
        enterButton={btnText}
        size="large"
        disabled={sending}
        loading={sending}
      />
    </div>
  );
}
