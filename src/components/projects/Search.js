import React from 'react'
import { Link, useLocation} from 'react-router-dom';
 

export const Search = (props) => {
    function  useQuery() {
        const url = new URLSearchParams(useLocation().search);
       return  url
      }


    function SearchDetails({name}){
        return (
          <div>
            {name ? (
              <h3>
                The <code>name</code> in the query string is &quot;{name}
                &quot;
              </h3>
            ) : (
              <h3>There is no name in the query string</h3>
            )}
          </div>
        );
        
      }

    let query = useQuery();

    return (
      <h3>
          <Link to='/search?name=Barcelona'>Barcelona</Link> 
         <SearchDetails name={query.get("name")} />
    </h3>
    )
  }

  export default Search