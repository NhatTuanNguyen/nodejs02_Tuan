var menuLv2 = document.getElementsByClassName("categoryLv2");
var current = document.getElementsByClassName("active");

for (var i = 0; i < menuLv2.length; i++) {
    menuLv2[i].addEventListener("click", function () {
        var parent = document.getElementsByClassName("menu-open");

        parent = parent[0].getElementsByClassName('categoryLv1');
        // var parent = this.closest('.nav-item');
        // console.log(parent);
        if (current.length > 0) {
            // for (let i = 0; i <= current.length; i++) {
            // current[0].classList.remove("active");
            current[1].classList.remove("active");
            // }
            this.className += " active";
            // parent[0].className += " active";
        } else {
            this.className += " active";
            parent[0].className += " active";
        }
        console.log(parent);
    });
}

const alerDelete = (test) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
            $.ajax({
                type: "GET",
                url: test,
                data: "data",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                }
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })

}

// kiểm tra số lượng đã checked và action lựa chọn
var checkCount = 0;
var textSelect = 'Bulk Action'
$(".custom-control-input").change(function () {
    checkCount = $('input:checkbox:checked').length;
    $(".badge").text(checkCount);;
});

$(".slbAction").change(function () {
    textSelect = $(".slbAction option:selected").text();
});

const applyAction = (link) => {
    console.log(textSelect);
    if (checkCount && textSelect !== 'Bulk Action') {
        $.ajax({
            type: "POST",
            url: link,
            data: "data",
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
    } else {
        Swal.fire({
            toast: true,
            icon: 'error',
            title: 'action unselected or unchecked items',
            animation: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }

}

const changeOrdering = (element) => {
    const id = element.getAttribute('data-id');
    const link = element.getAttribute('data-link');
    const value = element.value;
    // console.log(element.value);
    $.ajax({
        type: "POST",
        url: link,
        data: {id,value},
        dataType: "json",
        success: function (response) {
            Swal.fire({
                toast: true,
                icon: 'success',
                title: response,
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    });
}


