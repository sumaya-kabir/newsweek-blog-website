const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories => {
    categories.forEach(category => {
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div onclick="loadNews('${category.category_id}')" class="tabs"> 
        <a class="tab">${category.category_name}</a> 
      </div>
        `;

        categoryContainer.appendChild(categoryDiv);
    })
}

const loadNews = async (category_id) => {
    const url = `
    https://openapi.programming-hero.com/api/news/category/${category_id}
    `;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newsAll => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newsAll.forEach(news => {
        const newsDiv = document.createElement('div');
        // newsDiv.className = 'w-full';
    newsDiv.innerHTML = `
    
                <div class="my-12 p-12 card lg:card-side bg-gray-100 shadow-xl">
                <figure><img class="object-contain h-48 w-96" src="${news.image_url}" alt="Album"></figure>
                <div class="card-body">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details.slice(0, 200)}...</p>
                <div class="flex" >
                <label tabindex="0" class="btn btn-ghost btn-circle avatar mr-5">
                    <div class="w-10 rounded-full">
                    <img src="${news.author.img}" />
                    </div>
                </label>
                <div>
                <p class="font-medium text-gray-600">${news.author.name}</p>
                <p>${news.author.published_date
                }</p>
                </div>
                </div>
                
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Know More</button>
                </div>
                </div>
            </div>

    `;
    newsContainer.appendChild(newsDiv);
    })
}

loadCategory();