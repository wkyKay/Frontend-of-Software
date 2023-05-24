import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {
    Input, Box, HStack, useColorModeValue
} from 'native-base'
import MenuButton from "./menu-button";
import {PanGestureHandlerProps} from 'react-native-gesture-handler'
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'

interface ISearchResult {
    id: number;
    title: string;
    // other fields
}

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    input_text: string;
    place_holder: string;
    onChangeSubject?: (subject: string) => void
    width: string;
}


const InputBox = (props: Props) => {
    const {
        input_text,
        place_holder,
        onChangeSubject,
        width
    } = props


    const handleChangeSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            onChangeSubject && onChangeSubject(e.nativeEvent.text)
        },
        [onChangeSubject]
    )


    return (
        <HStack>
            <Box marginLeft={2}
                 bg={useColorModeValue('warmGray.50', 'primary.900')}
                 height="40px"
                 borderTopLeftRadius="20px"
                 borderTopRightRadius="20px"
                 borderBottomLeftRadius="20px"
                 borderBottomRightRadius="20px">
                <Input
                    type="text"
                    width={width}
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
        </HStack>
    );
};

export default InputBox;
