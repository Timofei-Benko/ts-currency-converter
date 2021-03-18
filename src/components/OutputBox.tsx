type propsType = {
    convertedAmount: number,
    toCurrency: string,
}

function OutputBox(props: propsType): JSX.Element {

    const {
        convertedAmount,
        toCurrency,
    } = props;

    const outputBoxStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '25px',
        overflow: 'scroll',
    };

    const outputTextStyles = {
        fontSize: '3rem',
    }

    return (
        <div style={outputBoxStyles}>
            <span style={outputTextStyles}>{ convertedAmount } { toCurrency }</span>
        </div>
    )
}

export default OutputBox;
