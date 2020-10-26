export const loadData = (list) =>
    d3.csv('./data.csv')
        .then((data) => {

            if (list) {

            let countries = [];
            data.forEach( d => {countries.push(d.nationality)});
            
            let countries_unique = Array.from(new Set(countries)).sort();
                
            var select = document.getElementById("countries");
            
            for(let i = 0; i < countries_unique.length; i++) {
                let opt = countries_unique[i];
                let el = document.createElement('option')
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }
            
            return data

        });