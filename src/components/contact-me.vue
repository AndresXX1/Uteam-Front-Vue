<template>
    <v-container class="pa-8">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card elevation="2" class="pa-6 contact-card">
            <v-card-title class="text-h5 justify-center">Contactame</v-card-title>
            <v-form ref="contactForm" v-model="isValid" lazy-validation>
              <v-text-field
                v-model="form.name"
                label="Name"
                required
                :rules="[rules.required]"
              ></v-text-field>
  
              <v-text-field
                v-model="form.email"
                label="Email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
  
              <v-textarea
                v-model="form.message"
                label="Message"
                required
                :rules="[rules.required]"
                rows="4"
              ></v-textarea>
  
              <v-btn color="primary" @click="submitForm" :disabled="!isValid">Send</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ContactMe',
    data() {
      return {
        isValid: false,
        form: {
          name: '',
          email: '',
          message: '',
        },
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => /.+@.+\..+/.test(value) || 'Ingrese un e-mail valido porfavor',
        },
      };
    },
    methods: {
      submitForm() {
        if (this.$refs.contactForm.validate()) {
          alert('Message sent successfully!');
          this.clearForm();
        }
      },
      clearForm() {
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  </style>
  