import { useState } from "react";
import styles from "../styles/Login.module.scss";
import classNames from "classnames/bind";
import {
  AvatarIcon,
  BellIcon,
  CloudLeft,
  CloudRight,
  DownloadIcon,
  FacebookIcon,
  GoogleIcon,
  LogoutIcon,
  MailIcon,
  Roof,
} from "../assets/icon";
import { BearIcon } from "../assets/svg/bear";
import { Pink_1, Pink_2 } from "../assets/svg/pinkCloud";
import { Heart, Star } from "../assets/svg/star";
import { Baby } from "../assets/svg/baby";
// import { set } from "nprogress";

import { ToastAction } from "../components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

import { signin } from "../services/auth";

const cx = classNames.bind(styles);
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const navi = useNavigate();
  const { toast } = useToast();
  const handleTogglePass = (value: boolean) => {
    if (passToggle === value) {
      setPassToggle(!passToggle);
    }
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    if (email === "" || password === "") {
      console.log("Empty");
    } else {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        const formData = new FormData();
        formData.append("email_or_username", email);
        formData.append("password", password);
        try {
          const response: any = await signin(formData);
          const { message } = response;

          if (message === "Invalid Password!!") {
            toast({
              variant: "destructive",
              description: `${message}`,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          } else {
            toast({
              variant: "default",
              description: `Login successfully!!`,
            });
            const account = JSON.stringify(response);
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("user", account);
            navi(`/profile/edit/${response.id_user}`);
          }
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            description: `Login fail!!`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } else {
        console.log("Wrong email");
      }
    }
  };
  const handleDownload = ()=>{
    console.log("Download")
  }
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <div className={cx("header")}>
          <div className={cx("logo")}>
            <Roof />
          </div>
          <div className={cx("action")}>
            <div className={cx("item_action", "button")} onClick={handleDownload}>
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
        <div className={cx("image_middle")}>
          <Star />
        </div>
        <div className={cx("body")}>
          <div className={cx("body_wrapper")}>
            <div className={cx("account")}>
              <div className={cx("main")}>
                <div className={cx("title")}>
                  <MailIcon width="20" height="20" /> Email & Password
                </div>
                <div className={cx("item_body")}>
                  <div className={cx("title")}>Email</div>

                  <input
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => handleChangeEmail(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </div>
                <div className={cx("item_body")}>
                  <div className={cx("title")}>
                    <div
                      className={cx("item_pass", passToggle && "unable")}
                      onClick={() => handleTogglePass(true)}
                    >
                      Password
                    </div>
                    <div
                      className={cx("item_pass", !passToggle && "unable")}
                      onClick={() => handleTogglePass(false)}
                    >
                      Change
                    </div>
                  </div>

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => handleChangePassword(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </div>
              </div>
            </div>
            <div className={cx("hug")}>
              <div className={cx("box")}>
                <div className={cx("icon")}>
                  <GoogleIcon />
                </div>
                <div className={cx("title")}>Google</div>
              </div>
              <div className={cx("box")}>
                <div className={cx("icon")}>
                  <FacebookIcon />
                </div>
                <div className={cx("title")}>Facebook</div>
              </div>
            </div>
            <div className={cx("hug")}>
              <div className={cx("box")}>
                <div className={cx("icon")}>
                  <LogoutIcon width="24px" height="24px" />
                </div>
                <div className={cx("title")}>Logout</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("image_bottom")}>
          <CloudLeft />
          <CloudRight />
          <Pink_1 />
          <BearIcon />
          <Baby />
          <Pink_2 />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
