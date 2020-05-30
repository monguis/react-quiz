import axios from "axios";

export default {
    getQuestionList: function() {
      return axios.get("/api/questions");
    },

    postAnswer: function(body) {
      return axios.post("/api/answer",body);
    }
  };