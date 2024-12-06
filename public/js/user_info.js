document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector("button.btn.btn-primary[type='button']");
  if (saveButton) {
    saveButton.addEventListener("click", async function () {

      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }

      try {
        const response = await fetch('/user/check/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
          })
        });

        if (response.ok) {
          alert("Mật khẩu đã được thay đổi thành công!");
        } else {
          const errorData = await response.json();
          alert("Có lỗi xảy ra: " + errorData.message);
        }
      } catch (error) {
        alert("Không thể kết nối tới server. Vui lòng thử lại sau!");
        console.error(error);
      }


    })
  }

});


document.getElementById("printHistory").addEventListener("click", async function () {
  const response = await fetch("/user/print/history", {
    method: 'GET',
    credentials: 'include'
  });
  window.location.href = "/user/print/history"
});