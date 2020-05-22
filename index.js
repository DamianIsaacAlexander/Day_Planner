let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let businessHours = ["5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM",];
let militaryTime = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
let savedItems = [];
init();
updateTimeObject();
function init() {

    var storedEvents = JSON.parse(localStorage.getItem("savedEvents"));
    if (storedEvents !== null) {
        savedItems = storedEvents;
    }
    else {
        savedItems.length = 0;
        for (let i = 0; i < businessHours.length; i++) {
            savedItems.push({ text: "" });
        }
    }

    renderHourBlocks();
}
function updateTimeObject() {
    let date = new Date();
    $("#currentDay").text(day[date.getDay()] + ", " + month[date.getMonth()] + ", " + date.getDate() + "th");
    militaryTime.forEach(function (item, indx) {
        if (item < date.getHours()) {
            $("[data-text = " + indx + "]").removeClass("future-hour");;
            $("[data-text = " + indx + "]").removeClass("current-hour");;
            $("[data-text = " + indx + "]").addClass("passed-hour");
        }
        else if (item === date.getHours()) {
            $("[data-text = " + indx + "]").removeClass("future-hour");;
            $("[data-text = " + indx + "]").removeClass("passed-hour");;
            $("[data-text = " + indx + "]").addClass("current-hour");
        }
        else {
            $("[data-text = " + indx + "]").removeClass("current-hour");;
            $("[data-text = " + indx + "]").removeClass("passed-hour");;
            $("[data-text = " + indx + "]").addClass("future-hour");
        }
    });
    var myTimer = setTimeout(updateTimeObject, 1000)
}
function renderHourBlocks() {
    $(".main-row").empty();
    businessHours.forEach(function (item, indx) {

        let hourBlock = $("<div>");
        let hourRow = $("<div>");
        let timeBlock = $("<div>");
        let textBlock = $("<div>");
        let textArea = $("<textarea>");
        let saveBlock = $("<div>");
        let saveButton = $("<button>");

        hourBlock.attr("class", "col-lg-12 hour-block");
        hourRow.attr("class", "row");
        timeBlock.attr("class", "col-lg-1 time-block");
        textBlock.attr("class", "col-lg-10 text-block");
        textArea.attr("data-text", indx);
        textArea.attr("value", "");
        saveBlock.attr("class", "col-lg-1 save-block");
        saveButton.attr("class", "save-button");
        saveButton.attr("data-indx", indx);

        textArea.val(savedItems[indx].text);
       
        timeBlock.text(businessHours[indx]);
        saveButton.text("Save");
        
        $(".main-row").append(hourBlock);
        hourBlock.append(hourRow);
        hourRow.append(timeBlock);
        textBlock.append(textArea);
        hourRow.append(textBlock);
        saveBlock.append(saveButton);
        hourRow.append(saveBlock);

    });
}
/*------------Event Listeners & Functions------------*/
$(document).on("click", ".save-button", saveEvent);
function saveEvent(event) {
    let dataIndex = $(this).attr("data-indx");
    event.preventDefault();
    let textField = $("[data-text = " + dataIndex + "]").val()
    savedItems[dataIndex].text = textField;
    storeEvent();

}
$("#clearAll").on("click", function () 
{
    $(".main-row").empty();
    localStorage.clear();
    init();
})
function storeEvent() {
    localStorage.setItem("savedEvents", JSON.stringify(savedItems));
};

