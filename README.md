# Invoice-Generator

## Overview

The Invoice Generator is a web-based application designed to streamline the invoicing process for small businesses, freelancers, and accountants. It aims to simplify billing, reduce manual errors, and improve financial record-keeping by providing a user-friendly platform for creating, managing, and sending professional invoices to clients.

## Features

Client Management: Basic client management system for adding, editing, and storing client information.

Tax Calculation: Automatically calculate taxes based on predefined rules or user input.

Export and Print: Export invoices in various formats and print them for record-keeping purposes.

Notification System: Receive alerts and notifications for invoice status changes or upcoming due dates.

Email Integration: Seamlessly send invoices to clients via email triggered by specific events.

## Scope

The project focuses on providing essential features for creating and managing invoices while maintaining simplicity and user-friendliness. It does not aim to be a full-fledged accounting software or include advanced functionalities such as inventory management or complex CRM features. The initial version supports one currency and basic security measures to ensure a quality product that meets the primary needs of most users.

## Target Users

1.Freelancers who need to send invoices to clients for various services.
2.Small business owners who require a streamlined process for billing customers.
3.Accountants who manage invoices for their clients.

## Installation

To run the Invoice Generator locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/invoice-generator.git`
2. Navigate to the project directory: `cd invoice-generator`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

## Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: Django

Database: MySQL

Cloud Services: GCP for email sending and other functionalities

## Backend

Run these commands in the backend terminal:

```
python -m venv env
env/Scripts/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
