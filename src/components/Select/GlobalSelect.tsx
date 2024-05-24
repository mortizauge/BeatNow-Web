// src/components/GlobalSelect.tsx
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { motion, AnimatePresence } from 'framer-motion'; // Importa AnimatePresence y motion de framer-motion


interface GlobalSelectProps {
    options: { value: string, label: string }[];
    isSearchable?: boolean;
    isMulti?: boolean;
    placeholder?: string;
    onChange?: (selectedOption: any) => void;
    components?: any;
}

const animatedComponents = makeAnimated();


const GlobalSelect: React.FC<GlobalSelectProps> = ({
                                                       options,
                                                       isSearchable,
                                                       isMulti,
                                                       placeholder,
                                                       onChange,
                                                       components = animatedComponents,

                                                   }) => {
    const commonStyles = {
        backgroundColor: '#494949',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '15px !important',
    };

    return (
        <div className="select-container">
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                <Select
                    className="select"
                    options={options}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    onChange={onChange}
                    components={{
                        Menu: ({ children, ...props }) => (
                            <motion.div
                                initial={{height: 2 }}
                                animate={{height: 'auto' }}
                                transition={{ duration: 0.1 }}
                            >
                                <components.Menu {...props}>{children}</components.Menu>
                            </motion.div>
                        ),
                        // Añade la animación a los elementos de la lista
                        MenuList: ({ children, ...props }) => (
                            <components.MenuList {...props}>
                                <AnimatePresence>
                                    {React.Children.map(children, (child, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2, delay: i * 0.1 }}
                                        >
                                            {child}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </components.MenuList>
                        ),
                    }}
                    styles={{
                        multiValueLabel(provided) {
                            return {
                                ...provided,
                                borderRadius: '20px',
                                backgroundColor: '#3C0F4B',
                                color: 'white'
                            };
                        },
                        singleValue(provided) {
                            return {
                                ...provided,
                                color: 'white',
                            };
                        },
                        multiValue(provided) {
                            return {
                                ...provided,
                                borderRadius: '10px',
                                backgroundColor: '#3C0F4B',
                                color: 'white',
                                ':hover': {
                                    color: 'white',
                                    borderRadius: '10px',
                                },
                            };
                        },
                        multiValueRemove(provided) {
                            return {
                                ...provided,
                                marginLeft: '1px',
                                color: 'white',
                                ':hover': {
                                    backgroundColor: '#3C0F4B',
                                    color: '#F04438',
                                    borderRadius: '10px',
                                },
                            };
                        },
                        option: (provided, state) => ({
                            ...provided,
                            borderRadius: '15px', // Ajusta este valor según tus necesidades
                            width: '98%'
                        }),
                        control: (provided) => ({
                            ...provided,
                            ...commonStyles,
                            boxShadow: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            marginTop: '5%',
                            minHeight: '75px',
                            padding: '2%'
                        }),
                        menu: (provided) => ({
                            ...provided,
                            borderRadius: '15px',
                            maxHeight: '225px',
                            boxShadow: '0 5px 20px -2px #111',
                        }),
                        menuList: (base) => ({
                            ...base,
                            margin: '8px 10px 8px 8px',
                            borderRadius: '15px',
                            maxHeight: '205px',
                            '::-webkit-scrollbar': {
                                width: '10px',
                                height: '0px',
                            },
                            '::-webkit-scrollbar-track': {
                                background: '#333',
                                borderRadius: '20px',
                                margin: '5px'

                            },
                            '::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '20px',

                            },
                            '::-webkit-scrollbar-thumb:hover': {
                                background: '#777',
                            },
                            '::-webkit-scrollbar-thumb:active': {
                                background: '#666',
                            },


                        }),
                        input: (provided, state) => ({
                            ...provided,
                            color: 'white !important',
                            background: '0px center !important ',
                            padding: '2% !important',
                        }),
                    }}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#3C0F4B',
                            primary50: '#3C0F4B',
                            primary: '#222',
                            background: '#494949',
                            neutral0: '#494949',
                            border: 'none',
                        },
                    })}
                />
            </motion.div>
        </div>
);
};

export default GlobalSelect;