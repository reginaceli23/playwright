import { test, expect, request } from "@playwright/test";

test("GET List User", async ({ page }) => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/users?page=2');
    expect (response.status()).toBe(200);
    const responJSON = await response.json();
    expect(responJSON.page).toBe(2);
    expect(responJSON.total).toBe(12);
    expect(responJSON.per_page).toBe(6);
    expect(responJSON.total_pages).toBe(2);

    // Log response for debugging
    console.log('Response status:', response.status());
});

test("POST Create", async ({ page }) => {
    const apiContext = await request.newContext();
    const postData = {
            "name": "morpheus",
            "job": "leader"
    }
    const response = await apiContext.post('https://reqres.in/api/users', {
        data : postData
    });
    expect(response.status()).toBe(201);
    const responJSON = await response.json();
    expect(responJSON.name).toBe('morpheus');
    expect(responJSON.job).toBe('leader');

    // Log response for debugging
    console.log('Response status:', response.status());
});

test("PATCH Update", async ({ page }) => {
    const apiContext = await request.newContext();
    const patchData = {
            "name": "morpheus",
            "job": "zion resident"
    }
    const response = await apiContext.patch('https://reqres.in/api/users/2', {
        data : patchData
    });
    expect(response.status()).toBe(200);
    const responJSON = await response.json();
    expect(responJSON.name).toBe('morpheus');
    expect(responJSON.job).toBe('zion resident');

    // Log response for debugging
    console.log('Response status:', response.status());
});

test("DELETE API", async ({ page }) => {
    const apiContext = await request.newContext();
    const deleteData = {
        id : 2
    }
    const response = await apiContext.delete('https://reqres.in/api/users/2', {
        data : deleteData
    });
    expect (response.status()).toBe(204);
    const bodyresponse = await response.text();
    expect(bodyresponse).toBe('');

    // Log response for debugging
    console.log('Response status:', response.status());
});

   