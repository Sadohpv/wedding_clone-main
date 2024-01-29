import { useState } from "react";
import styles from "../../styles/Login.module.scss";
import classNames from "classnames/bind";
import { AvatarIcon, BellIcon, DownloadIcon, Roof } from "../../assets/icon";

import { LargeBear } from "../../assets/svg/largeBear";
import LoginComponent from "../../components/initial/LoginComponent";

const cx = classNames.bind(styles);
function Login() {
  const handleDownload = () => {
    console.log("Download");
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("logo")}>
            <Roof />
          </div>
          <div className={cx("action")}>
            <div
              className={cx("item_action", "button")}
              onClick={handleDownload}
            >
              <DownloadIcon width="16" height="16" />
              Download app
            </div>
            <div className={cx("item_action")}>
              <BellIcon width="32" height="32" />
            </div>
            <div className={cx("item_action")}>
              <AvatarIcon width="32" height="32" />
            </div>
          </div>
        </div>

        {/* <div className={cx("body")}>
          <div className={cx("body_wrapper")}>
            <div className={cx("big_title")}>
              <span>Welcome Back</span>
              <span>Enter your Credentials to access your account</span>
            </div>
            <div className={cx("account")}>
              <div className={cx("main")}>
                <div className={cx("item_body")}>
                  <div className={cx("title")}>Email address</div>
                  <input
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => handleChangeEmail(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </div>
                <div className={cx("item_body", "child_2")}>
                  <div className={cx("title")}>
                    <div className={cx("item_pass", passToggle && "unable")}>
                      Password
                    </div>
                  </div>

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => handleChangePassword(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </div>
                <div className={cx("item_body", "child_3")}>
                  <div className={cx("title", "check_box")}>
                    <input type="checkbox" />
                    <div className={cx("item_title")}>Remember for 30days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("box")}>
              <div className={cx("title")}>Login</div>
            </div>
          </div>
          <div className={cx("last_line")}>

          </div>
        </div> */}
        <LoginComponent />
        <div className={cx("image_bottom")}>
          <LargeBear />
        </div>
      </div>
    </>
  );
}

export default Login;
