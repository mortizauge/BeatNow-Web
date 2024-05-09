// src/components/GlobalSelect.tsx
import React from 'react';
import Select from 'react-select';

interface GlobalSelectProps {
    options: { value: string, label: string }[];
    isSearchable?: boolean;
    isMulti?: boolean;
    placeholder?: string;
    onChange?: (selectedOption: any) => void;
}

const GlobalSelect: React.FC<GlobalSelectProps> = ({
                                                       options,
                                                       isSearchable,
                                                       isMulti,
                                                       placeholder,
                                                       onChange,
                                                   }) => {
    const commonStyles = {
        backgroundColor: '#494949',
        color: 'white',
        cursor: 'pointer',
        margin: '0 0 0 10px',
    };

    return (
        <div className="select-container">
            <Select
                className="select"
                options={options}
                isSearchable={isSearchable}
                isMulti={isMulti}
                placeholder={placeholder}
                onChange={onChange}
                styles={{
                    control: (provided) => ({...provided,...commonStyles, boxShadow: 'white', border: 'none', borderRadius: '0px'}),
                    menuList: (base) => ({
                        ...base,
                        '::-webkit-scrollbar': {
                            width: '10px',
                            height: '0px',
                        },
                        '::-webkit-scrollbar-track': {
                            background: '#494949',
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: '#888',
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        }
                    }),
                    input: (provided, state) => ({
                        ...provided,
                        color: 'white !important',
                        background: '0px center !important',
                        opacity: 1 ,
                        width: '100% !important',
                        font: 'inherit !important',
                        minWidth: '2px !important',
                        border: '0px !important',
                        margin: '0px !important',
                        outline: '0px !important',
                        padding: '0px !important',
                        minHeight: '40px !important',
                        display: 'flex !important',
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        text: 'black',
                        primary25: '#3C0F4B',
                        primary: 'black',
                        background: '#494949',
                        neutral0: '#494949',
                        border: 'black',
                        borderRadius: '0px !important',
                    },
                })}
            />
        </div>
    );
};

export default GlobalSelect;