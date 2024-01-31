import { useState } from "react";
import styles from "../../styles/pageStyles/Login.module.scss";
import classNames from "classnames/bind";
import { AvatarIcon, BellIcon, DownloadIcon, Roof } from "../../assets/icon";

import { LargeBear } from "../../assets/svg/largeBear";
import LoginComponent from "../../components/initial/LoginComponent";
import Header from "../../components/Header";
import { Heart } from "../../assets/svg/star";

const cx = classNames.bind(styles);
function Login() {
  const handleDownload = () => {
    console.log("Download");
  };
  return (
    <>
      <div className={cx("wrapper")}>
        {/* <div className={cx("image_head")}>
          <Heart />
        </div> */}
        <Header />

        <LoginComponent />
        <div className={cx("image_bottom")}>
          <LargeBear />
        </div>
      </div>
    </>
  );
}

export default Login;
