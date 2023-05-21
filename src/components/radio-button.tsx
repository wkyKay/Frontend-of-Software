// import React, { useState } from 'react';
// import {options} from "axios";
//
// interface RadioButtonProps {
//     options: string[];
//     selected:string;
//     onOptionChange: (option: string) => void;
// }
//
// const RadioButton: React.FC<RadioButtonProps> = (props:RadioButtonProps) => {
//    let {
//        options,
//        selectedOption,
//        onOptionChange
//    } = props
//     // const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     //
//     // const handleOptionChange = (option: string) => {
//     //     setSelectedOption(option);
//     // };
//     const handleOptionChange = (option: string) => {
//         setSelectedOption(option);
//         onOptionChange(option); // 调用外部传递的回调函数
//     };
//
//
//     return (
//         <div>
//             {options.map((option) => (
//                 <label key={option}>
//                     <input
//                         type="radio"
//                         value={option}
//                         checked={selectedOption === option}
//                         onChange={() => handleOptionChange(option)}
//                     />
//                     {option}
//                 </label>
//             ))}
//         </div>
//     );
// };
//
// export default RadioButton;
