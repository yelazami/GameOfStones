$(init);

function init() {
    $('#blah').hide();
    $("#imgInp").change(function(){
        readURL(this);
        $('#blah').show();
    });
    $('.table').DataTable();


}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            console.log(e,e.target);
        }
        reader.readAsDataURL(input.files[0]);
    }
}