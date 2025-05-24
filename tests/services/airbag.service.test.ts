import {
  AirbagService,
  CrashSensor,
  AirbagIgniter,
  AirbagResult,
} from "../../service/airbag.service";
import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";

describe("AirbagService", () => {
  let sensorMock: MockProxy<CrashSensor>;
  let igniteMock: MockProxy<AirbagIgniter>;
  let service: AirbagService;

  beforeEach(() => {
    sensorMock = mock<CrashSensor>();
    igniteMock = mock<AirbagIgniter>();
    service = new AirbagService(sensorMock, igniteMock);
  });

  it("deploys the airbag when a crash is detected", () => {
    //arrange
    when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);

    //act
    const result = service.deployAirbag();

    //assert
    expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
    expect(sensorMock.isCrashDetected).toHaveBeenCalled();
    expect(igniteMock.trigger).toHaveBeenCalledWith(100, 50);
  });

  it("does not deploy the airbag when no crash is detected", () => {
    //arrange
    when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);
    //act
    const result = service.deployAirbag();
    //assert
    expect(result).toEqual({ triggered: false });
    expect(sensorMock.isCrashDetected).toHaveBeenCalled();
    expect(igniteMock.trigger).not.toHaveBeenCalledWith(100,50);
  });
});
