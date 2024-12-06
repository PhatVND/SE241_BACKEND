async function addUser() {
    // Lấy giá trị từ các trường nhập liệu
    const email = document.getElementById('addEmailUser').value;
    const username = document.getElementById('addUserNameUser').value;
    const password = document.getElementById('addPasswordUser').value;
    const years = document.getElementsByName('addYearUser')[0].value;
    const role = document.getElementsByName('addRoleUser')[0].value;

    const resultMessageElement = document.getElementById('addResultMessage');

    // Kiểm tra xem các trường có được điền đầy đủ không
    if (!email || !username || !password || !years || !role) {
        document.getElementById('addResultMessage').innerText = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }

    // Tạo object để gửi trong body của yêu cầu
    const userData = {
        email,
        username,
        password,
        years,
        role
    };

    // Gửi yêu cầu POST đến endpoint
    try {
        const response = await fetch('/admin/add/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json();
        if (!response.ok) {
            document.getElementById('addResultMessage').innerText = 'Thêm người dùng thất bại: ' + data.message;
            resultMessageElement.style.color = 'red';
            return;
        }


        console.log('Response from server:', data);
        document.getElementById('addResultMessage').innerText = 'Người dùng được thêm thành công!';
        resultMessageElement.style.color = 'green';
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('addResultMessage').innerText = 'Thêm người dùng thất bại: ' + error.message;
        resultMessageElement.style.color = 'red';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', addUser);
});
