import css from "./HomePage.module.css"


const HomePage = () => {
    

    return (
      <div className={css.homePage}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <h2 className={css.desc}>
          You can find everything you want in our catalog
        </h2>
        <button className={css.btn}>View Now</button>
      </div>
    );
}

export default HomePage;