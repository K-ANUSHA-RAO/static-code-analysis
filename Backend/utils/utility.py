import logging

def setup_logging():
    """Sets up logging for the application."""
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def log_message(message):
    """Logs a message at INFO level."""
    logging.info(message)
