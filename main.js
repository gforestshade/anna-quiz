let app = new Vue({
    el: '#app',
    data: {
        show : null,
        game: true,
        owari: false,
        question: 0,
        correctAnswers: [0,0,3,2],
        list: [
            {name: "杏奈(あんな)"}
        ],
        appendList: [
            "柚葉(ゆずは)",
            "凪(なぎ)",
            "ひかり",
            "鈴(すず)"
        ]
    },
    computed: {
        maruList: function() {
            let listWithMaru = [];
            for (let i = 0; i < this.list.length; i++) {
                listWithMaru.push({name: "〇", answerId: i});
                listWithMaru.push({name: this.list[i].name, answerId: -1});
            }
            listWithMaru.push({name: "〇", answerId:this.list.length});
            return listWithMaru;
        }
    },
    methods: {
        onAnswer: function(event) {
            if (!this.game) return;

            const answerId = event.target.value;
            if (answerId < 0 ) {
                this.show = null;
                return;
            }

            if (answerId == this.correctAnswers[this.question]) {
                this.show = "correct";
                this.game = false;
            } else {
                this.show = "wrong";
            }
        },
        onNext: function(event) {
            this.list.splice(this.correctAnswers[this.question], 0, {name: this.appendList[this.question]});
            this.question++;
            this.show = null;

            if (this.question < this.correctAnswers.length) {
                this.game = true;
            } else {
                this.owari = true;
            }
        }
    }
})