import { TextInput, TextInputProps } from "react-native";

export function Input({...reset }: TextInputProps ) {
 return (
     <TextInput style={{ borderWidth: 1,
     borderColor: '#ccc',
      padding: 10,
       marginBottom: 10
     }} 
     {...reset} 
     />  
    )
}