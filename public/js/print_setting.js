document.addEventListener('DOMContentLoaded', function () {
    const orientationSelect = document.getElementById('orientation-select');
    const printSetting = document.querySelector('.print_setting');

    if (!orientationSelect || !printSetting) {
        console.error("Không tìm thấy 'orientation-select' hoặc '.print_setting'");
        return;
    }

    orientationSelect.addEventListener('change', function () {
        const orientation = this.value;
        if (orientation === 'landscape') {
            printSetting.classList.add('landscape');
            printSetting.classList.remove('portrait');
        } else if (orientation === 'portrait') {
            printSetting.classList.add('portrait');
            printSetting.classList.remove('landscape');
        } else {
            printSetting.classList.remove('landscape', 'portrait');
        }
    });
});