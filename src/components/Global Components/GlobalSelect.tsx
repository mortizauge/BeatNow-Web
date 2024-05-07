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

const GlobalSelect: React.FC<GlobalSelectProps> = ({ options, isSearchable, isMulti, placeholder, onChange }) => {
    return (
        <div className="select-container">
            <Select
                className={"select"}
                options={options}
                isSearchable={isSearchable}
                isMulti={isMulti}
                placeholder={placeholder}
                onChange={onChange}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        boxShadow: "white",
                        border: "none",
                        radius: 20,
                        backgroundColor: "494949",
                        width: "100%",
                        color: "white",
                        cursor: "pointer",
                        margin: "0 0 0 10px"
                    }),
                    menuList: (base) => ({
                        ...base,
                        "::-webkit-scrollbar": {
                            width: "10px",
                            height: "0px"
                        },
                        "::-webkit-scrollbar-track": {
                            background: "#494949"
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "#888"
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#555"
                        },
                        margin: "0 0 0 10px"
                    })
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 20,
                    colors: {
                        ...theme.colors,
                        text: 'black',
                        primary25: '#3C0F4B',
                        primary: 'black',
                        background: "494949",
                        neutral0: '#494949',
                        border: 'black',
                    },
                })}
            />
        </div>
    );
}

export default GlobalSelect;