from typing import Optional

class NotificationService:
    @staticmethod
    def send_notification(user_id: str, message: str, type: str = "push"):
        """
        Mock sending a notification.
        In a real app, this would use Firebase, Twilio, or an Email service.
        """
        print(f"[{type.upper()}] Sending to User {user_id}: {message}")
        # Logic to save to a notifications table could also go here
        return True

notification_service = NotificationService()
