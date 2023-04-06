import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Center, VStack } from 'native-base';
import {
  Pressable,
  useColorModeValue,
  Icon,
  Fab,
  Input, Box, HStack
} from 'native-base'
import MenuButton from "./menu-button";
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

interface ISearchResult {
  id: number;
  title: string;
  // other fields
}
interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
  input_text:string;
  place_holder: string;
  onChangeSubject?: (subject: string) => void
}


const SearchBox = (props: Props) => {
  const{
    input_text,
    place_holder,
    onChangeSubject
  } = props


  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
  )


  // function to fetch data from backend
  const fetchData = () => {
    try {
        const response =axios.get(
          `http://10.26.141.251:5000/getCourseList?name=wky2&age=212`
        );
    
    } catch (error) {
        console.error(error);
    }
  }


  return (
    <HStack>
      <Box marginLeft={2} 
      bg={"white"} 
      height="40px"
      borderTopLeftRadius="20px"
      borderTopRightRadius="20px"
      borderBottomLeftRadius="20px"
      borderBottomRightRadius="20px">
      <Input 
       type="text" 
       width={110} 
       borderTopLeftRadius="20px"
       borderTopRightRadius="20px"
       borderBottomLeftRadius="20px"
       borderBottomRightRadius="20px"
       height="40px"
       fontSize={17}
       placeholder={place_holder}
       onChange={handleChangeSubject}
       value={input_text}
       >
       </Input>
       </Box>
      
      {/* <MenuButton
        active
        onPress={() => {
          const response = axios.get(
            send_link + "?" +place_holder + "=" + input_text + "&"
            );
        }}
        icon="question"
      >
        {subject}
      </MenuButton> */}
    </HStack>
  );
};

export default SearchBox;