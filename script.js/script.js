// const url = "https://rickandmortyapi.com/api/character/";

// const container = document.querySelector(".js-list");

// const loadMore = document.querySelector(".js-load-more");
// let pages = 1;
// console.log(container);

// loadMore.addEventListener("click", onLoadMore);

// function servisCharacter(page=1) {
//     return fetch(`${url}?page=${page}`).then((resp) => {
      
//         if (!resp.ok) {
//             throw new Error(resp.statusText);
//         }
//         return resp.json();
//     });

// }
// servisCharacter().then((data) => {
//     console.log(data);
//     container.insertAdjacentHTML("beforeend", createMarkup(data.results));
//     if (data.info.pages > 1) {
//         loadMore.hidden = false;
//     }
// });

// function createMarkup(arr) {
//     return arr.map(({ image, name }) => `<li><img src="${image}" alt="${name}" width="200">
//     <h2>${name}</h2></li>`).join("");
// }

// function onLoadMore() {
//     pages += 1;
//     servisCharacter(pages).then((data) => {
//     console.log(data);
//         container.insertAdjacentHTML("beforeend", createMarkup(data.results));

//         if (data.info.pages === pages) {
//             loadMore.hidden = true;
//         }
        
// });
// }

// !===================================================================

const url = "https://rickandmortyapi.com/api/character/";

const container = document.querySelector(".js-list");

let pages = 1;

const guard = document.querySelector(".js-guard");

console.log(guard);

const options = {
  root: null,
  rootMargin: "100px",
};

const observer = new IntersectionObserver(callback, options);

function servisCharacter(page=1) {
    return fetch(`${url}?page=${page}`).then((resp) => {
      
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });

}

function createMarkup(arr) {
    return arr.map(({ image, name }) => `<li><img src="${image}" alt="${name}" width="200"><h2>${name}</h2></li>`).join("");
}

servisCharacter().then((data) => {
    container.insertAdjacentHTML("beforeend", createMarkup(data.results));
    if (data.info.pages > 1) {
        observer.observe(guard);
    }
});

// function callback(entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             pages += 1;
//             servisCharacter(pages).then((data) => {
//                 container.insertAdjacentHTML("beforeend", createMarkup(data.results));
//                 if (data.info.pages === pages) {
//                     observer.unobserve(guard);
//                 }
//             })
//         }
    
//     });
// }

// axios.get(`${url}?page=${page}`).t

function callback(entries) {
    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
            pages += 1;
            try {
                const data = await servisCharacter(pages);
                container.insertAdjacentHTML("beforeend", createMarkup(data.results));
                if (data.info.pages === pages) {
                    observer.unobserve(guard);
                }
            } catch (err) {
                console.log(err);
     }
        }
    
    });
}