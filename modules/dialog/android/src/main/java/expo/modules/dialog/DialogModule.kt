package expo.modules.dialog

import android.app.AlertDialog
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.toCodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DialogModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Dialog")

    AsyncFunction("show") { title: String, message: String, positive: String, negative: String, promise: Promise ->
      val context = appContext.currentActivity
      if (context == null) {
        promise.reject(Exception("There is no activity").toCodedException())
        return@AsyncFunction
      }
      val builder = AlertDialog.Builder(context)
      builder.setTitle(title)
      builder.setMessage(message)
      builder.setPositiveButton(positive) { dialogInterface, _ ->
        dialogInterface.dismiss()
        promise.resolve(true)
      }
      builder.setNegativeButton(negative) { dialogInterface, _ ->
        dialogInterface.dismiss()
        promise.resolve(false)
      }
      builder.show()
    }
  }
}
