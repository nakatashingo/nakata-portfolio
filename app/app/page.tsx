import Image from "next/image";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="app">
      <div className="card">
        <div className="Introduction">
          <div className="myName">
            <p>中田　慎吾</p>
          </div>
          <div className="subName">
            フロントエンド勉強中
          </div>
          <div className="description">
            <p>初めまして，中田慎吾です！最近，フロントエンドの勉強を始めました．HTML，CSSで基礎を学び，Reactの習得にも励んでいます．学習のまとめとして，ポートフォリオサイトを制作中です．</p>
          </div>
          <div className="contactIcons">
            <div className="contactIconImage">
              <a href="https://github.com/nakatashingo" target="_blank"><FaGithub color="FFFFFF" size="60%"/></a>
            </div>
            <div className="contactIconImage">
              <a target="_blank"><FaXTwitter color="FFFFFF" size="60%"/></a>
            </div>
            <div className="contactIconImage">
              <a target="_blank"><FaInstagram color="FFFFFF" size="60%"/></a>
            </div>
              
          </div>
        </div>
        <div className="myIcon">
          <img src="https://placehold.jp/200x200.png"></img>
        </div>
      </div>
    </div>
  );
}
