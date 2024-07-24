import styles from "./Paper.module.scss";

interface Props {
  children: any;
  className: any;
}

const Paper = ({ children, className }: Props) => {
  return <div className={`${styles.paper} ${className}`}>{children}</div>;
};

export default Paper;
