# 📚 EVLOEVFILM API Documentation

![API Banner](https://via.placeholder.com/1200x300/1a1a2e/ffffff?text=EVLOEVFILM+API+Documentation)

## 🌐 Introduction

EVLOEVFILM API Mirror is a proxy service that provides seamless access to movie data through our domain. This solution offers:

- 🔒 Secure API access without direct interaction with external services
- ⚡ Stable and reliable data delivery
- 🛡️ Built-in CORS support for web applications

All requests are processed transparently and return complete, unaltered data.

## 🔗 Base URL

```
https://evloevfilmapi.vercel.app/api
```

## 🔑 Authentication

```javascript
const API_TOKEN = "3794a7638b5863cc60d7b2b9274fa32e";
```

Include this token in all requests as a required parameter.

## 📊 API Parameters

| Parameter      | Description                          | Example Values               |
|----------------|--------------------------------------|-----------------------------|
| `token`        | API key (required)                   | `token=3794a7638b5863cc...` |
| `sort`         | Result sorting                       | `sort=-views` (most viewed) |
| `type`         | Content type filter                  | `films`, `serials`, `cartoon` |
| `limit`        | Result limit (default: 50)           | `limit=10`                  |
| `year`         | Release year filter                  | `year=2024`                 |
| `name`         | Title search                         | `name=крик`                 |
| `join_seasons` | Merge seasons (for series)           | `join_seasons=false`        |
| `genre`        | Genre filter                         | `genre=drama`               |

## 🎬 Response Structure

```json
{
  "id": number,
  "name": string,
  "poster": string,
  "iframe_url": string,
  "description": string,
  "year": number,
  "rating": number,
  "genres": string[],
  "kinopoisk_id": string,
  "trailer": string
}
```

## 💻 Usage Examples

### Fetch API Example
```javascript
fetch("https://evloevfilmapi.vercel.app/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=10")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Axios Example
```javascript
axios.get("https://evloevfilmapi.vercel.app/api/list", {
  params: {
    token: "3794a7638b5863cc60d7b2b9274fa32e",
    type: "films",
    year: 2024
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```

## 🔍 Sample Requests

1. **New films from specific year**
   ```
   https://evloevfilmapi.vercel.app/api/list?token=API_TOKEN&type=films&year=2024
   ```

2. **Popular films (sorted by views)**
   ```
   https://evloevfilmapi.vercel.app/api/list?token=API_TOKEN&type=films&sort=-views&limit=10
   ```

3. **Search by title**
   ```
   https://evloevfilmapi.vercel.app/api/list?token=API_TOKEN&name=крик
   ```

4. **Series by genre**
   ```
   https://evloevfilmapi.vercel.app/api/list?token=API_TOKEN&type=serials&genre=drama
   ```

## ⚠️ Error Handling

| Status Code | Description                          |
|-------------|--------------------------------------|
| 200         | Success                              |
| 400         | Bad Request - check your parameters  |
| 401         | Unauthorized - invalid token         |
| 404         | Resource not found                   |
| 500         | Internal server error                |

## 📜 License

This API is provided under the [MIT License](https://opensource.org/licenses/MIT).

---

> 🎥 Powered by EVLOEVFILM - Your gateway to cinematic world  
> 📅 Last Updated: October 2023  
> 🔗 [Main Website](https://evolvefilm.com) | [GitHub Repo](https://github.com/TETRIX8/evloevfilmapi.git)
