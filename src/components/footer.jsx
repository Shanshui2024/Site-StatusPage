import React, { useEffect, useState } from "react";
import { GithubOne, Home, Mail } from "@icon-park/react";
import CustomLink from "@/components/customLink";
import Package from "../../package.json";
import fetchLatestCommit from "../utils/getLatestBuild"


const Footer = () => {
  // 加载配置
  const githubName = import.meta.env.VITE_GITHUB_NAME;
  const homeUrl = import.meta.env.VITE_HOME_URL;
  const emailUrl = import.meta.env.VITE_EMAIL_URL;
  const siteIcp = import.meta.env.VITE_SITE_ICP;
  const moeIcp = import.meta.env.VITE_SITE_MOEICP;
  const PoweredBy = import.meta.env.VITE_POWERED_BY;
  const repoName = import.meta.env.VITE_REPO_NAME;

  const [commitHash, setCommitHash] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getLatestCommit = async (githubName,repoName) => {
      try {
        const hash = await fetchLatestCommit(githubName, repoName); // 替换为目标仓库
        setCommitHash(hash);
      } catch (err) {
        setError(err.message);
        setCommitHash("获取错误");
      }
    };

    getLatestCommit();
  }, []);



  return (
    <footer id="footer">
      <div className="social">
        <CustomLink
          iconDom={<GithubOne />}
          to={`https://github.com/${githubName}/`}
        />
        <CustomLink iconDom={<Home />} to={homeUrl} />
        <CustomLink iconDom={<Mail />} to={`mailto:${emailUrl}`} />
      </div>
      <div className="text">
        <p>
          <CustomLink
            text={Package.alia}
            to="https://github.com/imsyy/site-status"
          />
          &nbsp;Version&nbsp;{Package.version}
          &nbsp;|&nbsp;
          {[githubName,repoName] ? (
            <React.Fragment>
              构建版本&nbsp;
              <CustomLink to={`https://github.com/${githubName}/${repoName}`} text={`${commitHash}`} />
            </React.Fragment>
          ) : null}
        </p>
        <p>
基于&nbsp;<CustomLink to="https://uptimerobot.com/" text="UptimeRobot" />&nbsp;接口&nbsp;|&nbsp;检测频率 5 分钟
        </p>
        <p>
          Copyright&nbsp;&copy;&nbsp;2020&nbsp;-&nbsp;{new Date().getFullYear()}
          &nbsp;
          <CustomLink to="https://www.imsyy.top/" text="無名" />
        </p>
        <p>
          {siteIcp ? (
            <React.Fragment>
              &nbsp;|&nbsp;
              <CustomLink to="https://beian.miit.gov.cn/" text={siteIcp} />
            </React.Fragment>
          ) : null}
          {moeIcp ? (
            <React.Fragment>
              &nbsp;|&nbsp;
              <CustomLink to={`https://icp.gov.moe/?keyword=${moeIcp}`} text={"萌ICP备" + moeIcp + "号"} />
            </React.Fragment>
          ) : null}
        </p>
        <p>
          {homeUrl ? (
            <React.Fragment>
              &nbsp;|&nbsp;
              <CustomLink to={homeUrl} text={PoweredBy} />
            </React.Fragment>
          ) : null}

        </p>
      </div>
    </footer>
  );
};

export default Footer;
