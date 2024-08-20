import ExpoModulesCore

public class DialogModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Dialog")

    AsyncFunction("show") { 
    }
  }
}
