
export const CategoryList = ( { setImgPosition, setShowCategory, categoryObj } ) => {

      let header = []
      let article = []

      const categoryName = { 
        0  : 'aaa',
        1  : 'bbb',
        2  : 'ccc',
        3  : 'ddd',
        4  : 'Web Development',
        99999 : 'Všechny'
    }
    
    for (const [key, value] of Object.entries( categoryObj() ) ) {
        header.push(<p className="oneCategory" id={key} key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key }) ) } >{categoryName[key]}</p>)
        article.push(<p className="oneCategory" id={key} key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key }) ) }>{value}</p>)
    }

    return (
        <section className="categoryList" onMouseLeave={ () => setShowCategory(false)} >
            <fieldset>
                <legend>Kategorie / počet fotek</legend>
                <section>    
                <header>
                    {header}
                </header>
                <article>
                    {article}
                </article>
            </section>
            </fieldset>
        </section>
    )
}