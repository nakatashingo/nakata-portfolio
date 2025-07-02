import Image from "next/image";

export default function Home() {
  return (
    <div className="app">
      <div className="card">
        <div className="Introduction">
          <div className="myName">
            <p>中田　慎吾</p>
          </div>
          <div>
            フロントエンド勉強中
          </div>
          <div className="description">
            初めまして，中田慎吾です！最近，フロントエンドの勉強を始めました．HTML，CSSで基礎を学び，Reactの習得にも励んでいます．学習のまとめとして，ポートフォリオサイトを制作中です．
          </div>
          <div className="contactIcons">
            <div className="contactIconImage">
              <img src=""></img>
            </div>
            <div className="contactIconImage">
              <img src=""></img>
            </div>
            <div className="contactIconImage">
              <img src=""></img>
            </div>
              
          </div>
        </div>
        <div className="myIcon">

        </div>
      </div>
    </div>
  );
}
