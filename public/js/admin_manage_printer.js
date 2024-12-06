document.querySelectorAll('.status_option').forEach((dropdown) => {
    let previousValue = dropdown.value;

    // Save the current value before the user makes a change
    dropdown.addEventListener('focus', (event) => {
        previousValue = event.target.value; // Update the tracked value on focus
    });

    dropdown.addEventListener('change', async (event) => {
        const printer_name = event.target.getAttribute('data-printer_name');
        const newStatus = event.target.value;
        try {
            const response = await fetch('/admin/change/printer', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: printer_name,
                    newStatus: newStatus,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Cap nhat thanh cong')
            } else {
                alert('Lỗi');
                event.target.value = previousValue;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Lỗi: Không thể kết nối tới server.');
            event.target.value = previousValue;
        }
    })
});

document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
        const printer_name = event.currentTarget.getAttribute('data-printer-name');
        if (confirm(`Bạn có chắc chắn muốn xóa máy in ${printer_name}?`)) {
            try {
                const response = await fetch('/admin/delete/printer', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: printer_name
                    }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert(`Đã xóa máy in ${printer_name}`);
                    event.target.closest('tr').remove();
                } else {
                    alert(`Lỗi: ${result.message}`);
                }
            } catch (error) {
                alert('Không thể kết nối đến server.');
                console.error('Error:', error);
            }
        }
    })
});

async function addPrinter() {
    const name = document.getElementById('addNamePrinter').value.trim();
    const location = document.getElementById('printerLocation').value.trim();
    if (!name || !location) {
        document.getElementById('purchaseResultMessage').innerText = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }
    try {
        const response = await fetch('/admin/add/printer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, location }), // Dữ liệu gửi đi
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('purchaseResultMessage').innerText = `Thành công: ${result.message}`;
        } else {
            document.getElementById('purchaseResultMessage').innerText = `Lỗi: ${result.message || 'Có lỗi xảy ra.'}`;
        }
    } catch (error) {
        document.getElementById('purchaseResultMessage').innerText = 'Lỗi: Không thể kết nối tới server.';
        console.error('Error:', error);
    }
};

document.querySelectorAll('.printerHistory-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
        const printer_name = event.currentTarget.getAttribute('data-printer-name');
        const data = { printerName: printer_name };
        //console.log(printer_name)
        const queryString = new URLSearchParams(data).toString();
        console.log(queryString);
        try {
            const response = await fetch(`/admin/get/printer_history_by_name/?${queryString}`, {
                method: 'GET',
            });
            console.log(response)
            window.location.href = `/admin/get/printer_history_by_name/?${queryString}`;
        } catch (error) {
            console.log(error);
            console.log(1);
        }
    }
    )
});


document.getElementById('addPrinterButton').addEventListener('click', addPrinter);
