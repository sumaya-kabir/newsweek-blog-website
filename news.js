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
                <li onclick="loadNews('${category.category_id}')" class="mr-2">
                    <a href="#" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">${category.category_name}</a>
                </li>
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
    console.log(data.data);
}

loadCategory();