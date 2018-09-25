const express = require("express");
const cors = require("cors");
const products = require("./products.js");
const users = require("./users.js");
const bodyParser = require("body-parser");
const app = express();

function getProduct(productId) {
    let product = null;

    products.forEach(p => {
        if (p.id == productId) {
            product = p;
        }
    });

    return product;
}

function getUser(payload) {
    let user = null;

    users.forEach(u => {
        if (u.username == payload.username && u.password == payload.password) {
            user = u;
        }
    });

    return user;
}

function getUserByToken(token) {
    let user = null;

    users.forEach(u => {
        if (u.token == token) {
            user = u;
        }
    });

    return user;
}

function deleteReview(productId, reviewId) {
    let product = getProduct(productId);

    if (product) {
        let reviews = product.reviews;
        let index = -1;

        for (let i = 0; i < reviews.length && index == -1; i++) {
            if (reviews[i].id == reviewId) {
                index = i;
            }
        }

        if (index != -1) {
            product.reviews = reviews.splice(index, 1);
            return true;
        }
    }

    return false;
}

function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

app.use(cors());
app.use(bodyParser.json());

app.listen(8080, function() {
    console.log("Listening on port 8080...");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    let product = getProduct(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

app.post("/cart/add/:productId/:quantity", (req, res) => {
    // Simulate adding product to cart
    setTimeout(() => res.json({}), 1000);
});

app.post("/cart/increase-quantity/:productId", (req, res) => {
    // Simulate increasing quantity in cart
    setTimeout(() => res.json({}), 1000);
});

app.post("/products/:productId/reviews", (req, res) => {
    let product = getProduct(req.params.productId);

    if (product) {
        let newReview = req.body;
        newReview.id = uuid();
        product.reviews.push(newReview);
        res.json(newReview);
    } else {
        res.sendStatus(404);
    }
});

app.delete("/products/:productId/reviews/:reviewId", (req, res) => {
    if (deleteReview(req.params.productId, req.params.reviewId)) {
        res.json({});
    } else {
        res.sendStatus(404);
    }
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/auth", (req, res) => {
    let user = getUser(req.body);
    if (user) {
        user.token = uuid();
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});


app.post("/auth/check", (req, res) => {
    let user = getUserByToken(req.body.token);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(403);
    }
});
