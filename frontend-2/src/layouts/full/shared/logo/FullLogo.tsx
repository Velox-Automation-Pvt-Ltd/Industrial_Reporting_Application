import Logo from '/src/assets/images/logos/dark-logo.svg';
import CompanyLogo from '/src/assets/images/companyLogos/veloxLogoDark.png';
import { Link } from 'react-router';

const FullLogo = () => {
  return (
    <Link to={'/'} className="w-32">
      <img src={CompanyLogo} alt="logo" className="block" />
    </Link>
  );
};

export default FullLogo;
