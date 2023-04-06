import React,{useState, useEffect} from 'react'
import { Button, Icon, IButtonProps } from 'native-base'
import { Feather } from '@expo/vector-icons'

import SearchBox from './search-box';

interface Props extends IButtonProps {
  active: boolean
  icon: string
}

const SearchButton = (props: Props) => {
    const{
        active,
        icon,
        children,
    }=props
    

  return (
    <Button
      marginTop={5}
      width={40}
      marginLeft={20}
      size="lg"
      _light={{
        colorScheme: 'blue',
        _pressed: {
          bg: 'primary.100'
        },
        _text: {
          color: active ? 'blue.50' : 'blue.500'
        }
      }}
      _dark={{
        colorScheme: 'darkBlue',
        _pressed: {
          bg: 'primary.600'
        },
        _text: {
          color: active ? 'blue.50' : undefined
        }
      }}
      bg={active ? undefined : 'transparent'}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={<Icon as={Feather} name={icon} size="sm" opacity={0.5} />}
      {...props}
      
     
    >
      {children}
    </Button>
   
  )
}

export default SearchButton
