import Numeral from 'numeraljs';

const FormattedNumber = ({ children, format }) => Numeral(children).format(format);

export default FormattedNumber;
