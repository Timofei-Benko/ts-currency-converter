import { TextField, Select, MenuItem } from '@material-ui/core';

type currType = {
    Cur_Abbreviation: string,
    Cur_OfficialRate: number,
    Cur_Scale: number,
    length: number,
}

type propsType = {
    currencyData: any[],
    length: number,
    convert: (ev: number) => void,
    handleCurrencyChange: (ev: string) => void,
    amount: void,
    setAmount: (ev: number) => void,
};

function InputBox(props: propsType): JSX.Element{

    const {
        currencyData,
        convert,
        handleCurrencyChange,
        amount,
        setAmount,
    } = props;

    const inputBoxStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        width: '100%',
        overflow: 'scroll',
    };

    const arrowStyles = {
        marginTop: '15px',
        fontSize: '1.5rem',
    };

    const selectStyles = {
        marginTop: '15px',
    };

    return (
        <div>
            <div style={inputBoxStyles}>
                <TextField id="filled-basic"
                           label="BYN"
                           color="primary"
                           size="medium"
                           type="text"
                           value={amount}
                           onChange={ (ev) => {
                               setAmount(+ev.target.value)
                               convert(+ev.target.value)
                           } }
                />
                <span style={arrowStyles}>→</span>
                <Select
                    style={selectStyles}
                    defaultValue={'USD'}
                    onChange={ (ev: any) => {
                            handleCurrencyChange(ev.currentTarget.value)
                        }
                    }
                >
                    {currencyData && currencyData.length !== 0 ?
                        currencyData.map((curr: currType) => (
                            <MenuItem
                                key={curr.Cur_Abbreviation}
                                value={curr.Cur_Abbreviation}
                            >{curr.Cur_Abbreviation}
                            </MenuItem>
                        ))
                        :
                        null
                    }
                </Select>
            </div>
        </div>
    )
}

export default InputBox;
