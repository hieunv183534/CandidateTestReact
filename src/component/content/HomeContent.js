import React from "react";
import '../../css/layout/HomeContent.css';
import { CanvasJSChart } from 'canvasjs-react-charts'

function HomeContent() {

    const options1 = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Số lượng câu hỏi trên hệ thống"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y} câu hỏi",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y} câu hỏi",
            dataPoints: [
                { y: 20, label: "Trắc nghiệm 1 đáp án" },
                { y: 23, label: "Trắc nghiệm nhiều đáp án" },
                { y: 17, label: "Tự luận" }
            ]
        },
        ]
    }

    const options2 = {
        animationEnabled: true,
        subtitles: [{
            text: "Tổng 50 bài thi",
            verticalAlign: "center",
            fontSize: 18,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "GMAT", y: 29 },
                { name: "Tiếng Anh", y: 31 },
                { name: "Chuyên môn", y: 40 },
            ]
        }]
    }

    const options3 = {
        theme: "light2",
        title: {
            text: "Số bài thi và người thi"
        },
        subtitles: [{
            text: "GBP & USD to INR"
        }],
        axisY: {
            prefix: ""
        },
        toolTip: {
            shared: true
        },
        data: [
        {
            type: "area",
            name: "Chưa làm",
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "Bài thi",
            dataPoints: [
                { x: new Date("2017- 01- 01"), y: 84.927},
                { x: new Date("2017- 02- 01"), y: 82.609},
                { x: new Date("2017- 03- 01"), y: 81.428},
                { x: new Date("2017- 04- 01"), y: 83.259},
                { x: new Date("2017- 05- 01"), y: 83.153},
                { x: new Date("2017- 06- 01"), y: 84.180},
                { x: new Date("2017- 07- 01"), y: 84.840},
                { x: new Date("2017- 08- 01"), y: 82.671},
                { x: new Date("2017- 09- 01"), y: 87.496},
                { x: new Date("2017- 10- 01"), y: 86.007},
                { x: new Date("2017- 11- 01"), y: 87.233},
                { x: new Date("2017- 12- 01"), y: 86.276}
            ]
        },
        {
            type: "area",
            name: "Đã làm",
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "Bài thi",
            dataPoints: [
                { x: new Date("2017- 01- 01"), y: 67.515},
                { x: new Date("2017- 02- 01"), y: 66.725},
                { x: new Date("2017- 03- 01"), y: 64.86},
                { x: new Date("2017- 04- 01"), y: 64.29},
                { x: new Date("2017- 05- 01"), y: 64.51},
                { x: new Date("2017- 06- 01"), y: 64.62},
                { x: new Date("2017- 07- 01"), y: 64.2},
                { x: new Date("2017- 08- 01"), y: 63.935},
                { x: new Date("2017- 09- 01"), y: 65.31},
                { x: new Date("2017- 10- 01"), y: 64.75},
                { x: new Date("2017- 11- 01"), y: 64.49},
                { x: new Date("2017- 12- 01"), y: 63.84}
            ]
        }
        ]
    }

    return (<div className="content">
        <CanvasJSChart options={options1} />
        <br />
        <CanvasJSChart options={options2} />
        <br />
        <CanvasJSChart options={options3} />
        <br /><br />
    </div>);
}

export default HomeContent;